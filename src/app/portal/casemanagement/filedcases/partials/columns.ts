import { ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";

export interface ICase {
  id: number;
  title: string;
  amount: number;
  suitNo: string;
  defendantName: string;
  defentAddress: string;
  defendatPhone: string;
  plaintiffName: string;
  plaintiffAddress: string;
  plaintiffPhone: string;
  files?: string[];
  createdAt: string;
  paid: boolean;
  caseType: string | number;
  caseNature: string;
  reflief?: string;
  cliams?: string;
  summary?: string;
  dateOfPayment: string;
}

export const columns: ColumnDef<ICase>[] = [
  {
    accessorKey: "suitNo",
    header: "Suit No.",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "caseType",
    header: "Case Type",
  },
  {
    accessorKey: "caseNature",
    header: "Case Nature",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export const tableData: ICase[] = [
  {
    id: 1,
    caseType: "Civil",
    caseNature: "Divorce and Matrmonial",
    paid: true,
    title: "Rita Emefa Agbalo VS Samuel Ataa",
    amount: 100.0,
    suitNo: `A001/001/${format(new Date(), "yyy")}`,
    defendantName: "Samuel Ataa",
    defendatPhone: "012234442342",
    defentAddress: "Address 1",
    plaintiffAddress: "Address 2",
    plaintiffName: "Rita Emefa Agbalo",
    plaintiffPhone: "111344223",
    createdAt: format(new Date(), "dd MMM yyy"),
    dateOfPayment: format(new Date(), "dd MMM yyy"),
    files: ["file 1", "file 2"],
  },
  {
    id: 1,
    caseType: "Criminal",
    caseNature: "Sexual Offences",
    paid: true,
    title: "Plaintiff VS Defendant",
    amount: 100.0,
    suitNo: `C011/012/${format(new Date(), "yyy")}`,
    defendantName: "Samuel Ataa",
    defendatPhone: "012234442342",
    defentAddress: "Address 1",
    plaintiffAddress: "Address 2",
    plaintiffName: "Rita Emefa Agbalo",
    plaintiffPhone: "111344223",
    createdAt: format(new Date(), "dd MMM yyy"),
    reflief: "This will be for reliefs",
    summary: "this is for summary",
    cliams: "This id for cliams",
    dateOfPayment: format(new Date(), "dd MMM yyy"),
  },
];
