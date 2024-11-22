export function request(ctx) {
  console.log("ctx: +", ctx);
  const { source, args } = ctx;
  return {
    operation: "Invoke",
    payload: { action: ctx.info.fieldName, arguments: args, source },
  };
}

export function response(ctx) {
  console.log("response ctx: ", ctx);
  if (ctx.error) {
    return {
      data: null,
      error: {
        message: ctx.error.message || "Lambda Invocation failed",
        code: ctx.error.code || "LAMBDA_CODE",
        type: ctx.error.type || "LAMNDA_ERROR",
      },
    };
  }
  return {
    data: ctx.result,
    error: null,
  };
}
