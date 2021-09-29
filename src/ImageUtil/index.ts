export async function getImageFromUrl (src: string) {
  return new Promise<HTMLImageElement>((res) => {
    let img = new Image;
    img.onload = () => {
      res(img);
    }
    img.src = src;
  });
}