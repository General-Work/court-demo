"use client";
import Modal from "app/app/components/ui/modal";
import React, { useRef, useState } from "react";
import DataTable from "app/app/components/datatable/datatable";
import { columns, tableData } from "./partials/columns";
import AlertModal from "app/app/components/ui/alertModal";
import Editor from "./partials/editor";
import { ITableRowActionList } from "app/app/components/datatable/partials/tabletypedefs";
import Receipt from "app/app/components/receipts/receipt";
import { Button } from "app/app/components/form-components/button";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

const actionOptions: ITableRowActionList[] = [
  { icon: "fe:edit", title: "Edit", accessor: "edit" },
  { icon: "bi:receipt-cutoff", title: "Receipt", accessor: "receipt" },
  { icon: "ion:open-outline", title: "Open Docket", accessor: "docket" },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    recordId: 0,
    open: false,
  });
  const [data, setData] = useState<any | null>(null);
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [busy, setBusy] = useState(false);
  const [showReceipt, setShowReceipt] = useState({
    open: false,
  });

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const toggleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setEdit({ recordId: 0, open: false });
    if (data) {
      setData(null);
    }
  };

  const openDocket = () => {
    const load = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, 1000);
      });
    };
    toast.promise(load(), {
      loading: "Opening docker...",
      success: "Successfully opened docket",
      error: (err) => err?.message,
    });

    // showPromise({
    //   promise: load(),
    //   loading: "Opening docker...",
    //   success: "Successfully opened docket",
    //   error: "",
    // });
  };

  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as any;
        setData(d);
        setEdit({ recordId: row.id, open: true });
        break;
      case "receipt":
        // setAlert({ open: true, recordId: row.id });
        setShowReceipt({ open: true });
        break;
      case "docket":
        openDocket();
        break;
      default:
        break;
    }
  };

  const closeAlert = () => {
    setAlert({ recordId: 0, open: false });
  };

  const closeReceipt = () => {
    setShowReceipt({ open: false });
  };

  return (
    <div className=" container mx-auto p-5">
      <div className=" w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2">
        <h1 className=" text-gray-500 font-medium text-lg flex items-center">
          Filed Cases
        </h1>
      </div>

      <Modal
        size="3xl"
        open={open}
        closeModal={toggleModal}
        title={edit.open ? "Update Case" : "File New Case"}
      >
        <Editor done={toggleModal} />
      </Modal>
      <DataTable
        columns={columns}
        actionName="File New Case"
        onAction={toggleModal}
        data={tableData}
        showTableActions
        tableRowActionList={actionOptions}
        allowCustomRowActionList
        onTableRowAction={onRowAction}
      />

      <AlertModal
        open={alert.open}
        onCancel={closeAlert}
        onContinue={() => {}}
        busy={busy}
      />

      <Modal open={showReceipt.open} closeModal={closeReceipt} size="3xl">
        <div className="flex flex-col">
          <Receipt ref={componentRef} />
          <div className="grid px-28 pb-8 pt-2">
            <Button className="w-full grid text-lg" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
