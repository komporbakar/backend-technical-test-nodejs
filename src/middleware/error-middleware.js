import multer from "multer";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { logging } from "../utils/logging";

export const errorMiddleware = async (error, req, res, next) => {
  try {
    if (error instanceof ZodError) {
      if (error.issues[0].path[0] === "top_up_amount") {
        return res.status(400).json({
          status: 102,
          message:
            "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
          data: null,
        });
      } else if (error.issues[0].path[0] === "service_code") {
        return res.status(400).json({
          status: 102,
          message: "Service ataus Layanan tidak ditemukan",
          data: null,
        });
      }
      return res.status(400).json({
        status: 102,
        message: "Paramter email tidak sesuai format",
        data: null,
      });
    } else if (error instanceof multer.MulterError) {
      logging.debug(error);
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    } else if (error instanceof ResponseError) {
      return res.status(error.statusCode).json({
        status: error.status || 500,
        message: error.message || "Internal Server Error",
        data: null,
      });
    } else {
      throw error;
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};
