import React from 'react';
import jsPDF from 'jspdf';
import boletaImg from '@/utils/Logo.jpeg';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/ticket';

const generatePDF = (invoice: Invoice) => {
	const docWidth = 80;
	const baseHeight = 150;
	const maxHeight = 280;
	const productLineHeight = 6;
	const additionallHeight = invoice.products.length * productLineHeight;
	const calculatedHeight = baseHeight + additionallHeight;
	const docHeight = Math.min(Math.max(baseHeight, calculatedHeight), maxHeight);

	// Crear documento PDF con tamaño y orientación personalizados
	const doc = new jsPDF({
		orientation: 'portrait',
		unit: 'mm',
		format: [docWidth, docHeight] // Tamaño personalizado para boleta de venta
	});

	// Calcular posiciones centradas
	const imgWidth = 70;
	const imgHeight = 40;
	const centerX = docWidth / 2;
	const imgX = (docWidth - imgWidth) / 2;
	const textX = centerX;

	// Agregar imagen al documento PDF
	doc.addImage(boletaImg, 'JPEG', imgX, 5, imgWidth, imgHeight);

	// Establecer estilos y contenido
	doc.setFontSize(13);
	doc.text('Minimarket POS', textX, 50, { align: 'center' });
	doc.text('Boleta de Venta', textX, 55, { align: 'center' });

	doc.setFontSize(11);
	doc.text(`-Fecha: ${invoice.date}-`, textX, 60, { align: 'center' });
	doc.text(`Cliente: ${invoice.customer}`, textX, 65, { align: 'center' });

	// Detalle de productos con subtotales en formato de tabla
	let y = 70;

	doc.setFontSize(7);
	doc.text('Producto', 6, y);
	doc.text('Cant.', 40, y);
	doc.text('Precio', 49, y);
	doc.text('Subtotal', 64, y);

	y += 2; // Ajustar para que la línea esté más cerca de los encabezados
	doc.setLineWidth(0.1);
	doc.line(6, y, 75, y);

	y += 5; // Ajustar el espacio después de la línea
	invoice.products.forEach((product) => {
		const productNameLines: string[] = doc.splitTextToSize(product.name, 34);

		productNameLines.forEach((line: string, index: number) => {
			doc.text(line, 6, y + index * 4);
		});

		doc.text(product.quantity.toString(), 43, y, { align: 'right' });
		doc.text(`S/.${product.price.toFixed(2)}`, 58, y, { align: 'right' });
		doc.text(`S/.${product.subtotal.toFixed(2)}`, 73, y, { align: 'right' });
		y += 6 + (productNameLines.length - 1) * 4; // Aumentar el espacio entre las líneas de productos
	});

	// Total
	y += 4; // Espacio adicional antes de mostrar el total
	doc.setFontSize(8);
	doc.text('Total', 50, y);
	doc.text(`S/.${invoice.total.toFixed(2)}`, 69, y, { align: 'center' });

	// Guardar PDF con nombre específico
	const pdfUrl = doc.output('bloburl');
	const win = window.open(pdfUrl.toString(), '_blank');
	if (!win) {
		alert('No se pudo abrir la vista previa del PDF. Por favor, habilite las ventanas emergentes para este sitio.');
	}
};

const InvoicePdf: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
	return (
		<div>
			<Button variant='outline' size='icon' className='overflow-hidden rounded-full' onClick={() => generatePDF(invoice)}>
				<img src='https://imgur.com/3VTic93.jpeg' width={36} height={36} alt='Avatar' className='overflow-hidden rounded-full' />
			</Button>
		</div>
	);
};

export default InvoicePdf;
export { generatePDF };
