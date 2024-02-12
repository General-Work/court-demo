"use client";
import Modal from "app/app/components/ui/modal";
import React, { useState } from "react";
import Editor from "./partials/editor";
import DataTable from "app/app/components/datatable/datatable";
// import { columns, tableData } from "./partials/columns";
import { ITableRowActionList } from "app/app/components/datatable/partials/tableRowActions";
import { columns, tableData } from "../../filedcases/partials/columns";

const actionOptions: ITableRowActionList[] = [
  {
    icon: "clarity:date-outline-alerted",
    title: "Allocate Case",
    accessor: "allocate",
  },
  // { icon: "ion:open-outline", title: "Open Docket", accessor: "docket" },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [recordId, setRecordId] = useState(0);
  const [data, setData] = useState<any | null>(null);

  const toggleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setRecordId(0);
    if (data) {
      setData(null);
    }
  };

  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "allocate":
        toggleModal();
        const d = row as any;
        setData(d);
        setRecordId(row.id);
        break;
      case "":
        break;
      default:
        break;
    }
  };

  return (
    <div className=" container mx-auto p-5">
      <div className=" w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2">
        <h1 className=" text-gray-500 font-medium text-lg flex items-center">
          Pending Allocations
        </h1>
      </div>

      <Modal
        size="3xl"
        open={open}
        closeModal={toggleModal}
        title={"Case Allocation"}
      >
        <Editor data={data} done={toggleModal} />
      </Modal>
      <DataTable
        columns={columns}
        hasAction={false}
        onAction={toggleModal}
        data={tableData}
        showTableActions
        allowCustomRowActionList
        tableRowActionList={actionOptions}
        onTableRowAction={onRowAction}
      />
    </div>
  );
};

export default Page;
