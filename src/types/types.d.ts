import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: any; // This lets us use autoTable() method
    lastAutoTable: {
      finalY: number;
    };
  }
}
