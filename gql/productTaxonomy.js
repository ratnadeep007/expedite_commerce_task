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
  return ctx.result;
}
