// não usado
export function assignSequelizeInclude(
  request: { [key: string]: any },
  include = [{}]
) {
  const keys = Object.keys(request);
  const arrayType = keys.filter((key) => Array.isArray(request[key]));

  arrayType.map((key) => {
    const isListObject = request[key].every(
      (item: any) => typeof item === "object"
    );
    if (!isListObject) return;

    request[key] = request[key].map((item: any) => {
      include.push({
        association: request.model + "." + item.model,
      });
      return assignSequelizeInclude(item, include);
    });
  });
}
