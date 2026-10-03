const products = [
  { name: "火山方舟", href: "https://www.volcengine.com/product/ark" },
  {
    name: "BytePlus ModelArk",
    href: "https://www.byteplus.com/en/product/modelark",
  },
];

export function ProductLinks({ text }: { text: string }) {
  return text.split(/(火山方舟|BytePlus ModelArk)/g).map((part) => {
    const product = products.find((item) => item.name === part);
    return product ? (
      <a className="product-link" href={product.href} key={product.name}>
        {product.name}
      </a>
    ) : (
      part
    );
  });
}
