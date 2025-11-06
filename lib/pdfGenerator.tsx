import { pdf } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #000080",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000080",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    color: "#808080",
    marginBottom: 3,
  },
  value: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 8,
  },
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #E0E0E0",
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  total: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000080",
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTop: "1 solid #E0E0E0",
    fontSize: 8,
    color: "#808080",
    textAlign: "center",
  },
});

const SampleReceipt = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Payment Receipt</Text>
        <Text style={styles.subtitle}>Payng School Payment System</Text>
      </View>

      {/* Receipt Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Receipt Number</Text>
        <Text style={styles.value}>REC-20241018-001</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>October 18, 2024</Text>

        <Text style={styles.label}>Student Name</Text>
        <Text style={styles.value}>Emma Wilson</Text>

        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>STU-2024-0234</Text>

        <Text style={styles.label}>Payment Method</Text>
        <Text style={styles.value}>Credit Card (****1234)</Text>
      </View>

      {/* Payment Items */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>
            Tuition Fee - Q1 2024
          </Text>
          <Text style={styles.tableCell}>$1,200.00</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Lab Fee</Text>
          <Text style={styles.tableCell}>$300.00</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Sports Fee</Text>
          <Text style={styles.tableCell}>$200.00</Text>
        </View>
      </View>

      {/* Total */}
      <View style={styles.total}>
        <Text style={styles.totalText}>Total Paid: $1,700.00</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your payment</Text>
        <Text>
          This is a computer-generated receipt and does not require a signature
        </Text>
        <Text>For inquiries, contact support@payng.com</Text>
      </View>
    </Page>
  </Document>
);

export async function generateSampleReceipt() {
  const blob = await pdf(<SampleReceipt />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${Date.now()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
