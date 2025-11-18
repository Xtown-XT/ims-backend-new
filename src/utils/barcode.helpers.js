// Generate a unique 12-digit barcode text
export const generateUniqueBarcodeText = () => {
    const num = Math.floor(Math.random() * 1_000_000_000000); // 12 digits
    return String(num).padStart(12, "0");
};
