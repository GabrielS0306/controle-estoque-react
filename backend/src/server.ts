import "dotenv/config";
import cors from "cors";
import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT ?? 3333);

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

const productSchema = z.object({
  name: z.string().trim().min(2),
  category: z.string().trim().min(2),
  sku: z.string().trim().min(2),
  stock: z.coerce.number().int().min(0),
  minimum: z.coerce.number().int().min(0),
  price: z.coerce.number().min(0),
});
const movementSchema = z.object({
  type: z.enum(["Entrada", "SaÃ­da"]),
  quantity: z.coerce.number().int().positive(),
  note: z.string().trim().max(160).optional(),
});

app.get("/health", (_request, response) => response.json({ status: "ok" }));
app.get("/products", async (_request, response) =>
  response.json(await prisma.product.findMany({ orderBy: { name: "asc" } })),
);
app.post("/products", async (request, response, next) => {
  try {
    response
      .status(201)
      .json(
        await prisma.product.create({
          data: productSchema.parse(request.body),
        }),
      );
  } catch (error) {
    next(error);
  }
});
app.patch("/products/:id", async (request, response, next) => {
  try {
    response.json(
      await prisma.product.update({
        where: { id: Number(request.params.id) },
        data: productSchema.partial().parse(request.body),
      }),
    );
  } catch (error) {
    next(error);
  }
});
app.delete("/products/:id", async (request, response, next) => {
  try {
    await prisma.product.delete({ where: { id: Number(request.params.id) } });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
app.get("/movements", async (_request, response) =>
  response.json(
    await prisma.movement.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ),
);
app.post("/products/:id/movements", async (request, response, next) => {
  try {
    const productId = Number(request.params.id);
    const data = movementSchema.parse(request.body);
    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const product = await tx.product.findUniqueOrThrow({
          where: { id: productId },
        });
        const nextStock =
          data.type === "Entrada"
            ? product.stock + data.quantity
            : product.stock - data.quantity;
        if (nextStock < 0)
          throw new Error("Estoque insuficiente para esta saÃ­da.");
        await tx.product.update({
          where: { id: productId },
          data: { stock: nextStock },
        });
        return tx.movement.create({
          data: { ...data, productId },
          include: { product: { select: { name: true } } },
        });
      },
    );
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
app.use(
  (error: unknown, _request: express.Request, response: express.Response) => {
    const message =
      error instanceof z.ZodError
        ? "Dados invÃ¡lidos."
        : error instanceof Error
          ? error.message
          : "Erro interno do servidor.";
    response.status(400).json({ message });
  },
);
app.listen(port, () =>
  console.log(`API disponÃ­vel em http://localhost:${port}`),
);
