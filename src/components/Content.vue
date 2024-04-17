<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ]
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="sticky top-0 w-full bg-red-400">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, in.
      </p>
    </div>

    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> Invoice </TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead class="text-right"> Amount </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell class="font-medium">
              {{ invoice.invoice }}
            </TableCell>
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell class="text-right">
              {{ invoice.totalAmount }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
