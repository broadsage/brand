/**
 * Broadsage Vector & Raster Export Utilities
 * Provides sanitized XML serialization, Blob creation, and high-DPI canvas rendering.
 */

/**
 * Serializes an SVG DOM element to a valid standalone XML string.
 */
export function serializeSvg(svgElem: SVGElement): string {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElem);
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return source;
}

/**
 * Triggers a browser file download for a given Blob.
 */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Serializes and triggers a direct SVG vector file download.
 */
export function downloadSvgElement(svgElem: SVGElement, filename: string): void {
  const source = serializeSvg(svgElem);
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  triggerBlobDownload(blob, filename);
}

/**
 * Renders an SVG element to a high-resolution PNG on an offscreen HTML5 canvas.
 */
export function exportSvgToPng(
  svgElem: SVGElement,
  targetWidth: number,
  targetHeight: number,
  outputFilename: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const source = serializeSvg(svgElem);
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob((blob) => {
          if (!blob) {
            URL.revokeObjectURL(url);
            reject(new Error('Canvas PNG generation failed'));
            return;
          }
          triggerBlobDownload(blob, outputFilename);
          URL.revokeObjectURL(url);
          resolve();
        }, 'image/png');
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

