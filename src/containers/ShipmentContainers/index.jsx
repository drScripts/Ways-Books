import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { CustomSelect } from "../../components";
import API from "../../services";

const shipmentServices = [
  {
    value: "jne",
    label: "JNE",
  },
  {
    value: "pos",
    label: "POS Indonesia",
  },
  {
    value: "tiki",
    label: "TIKI",
  },
];

export default function ShipmentContainers({
  userDest,
  setCost,
  isAvailable = false,
}) {
  const [shipment, setShipment] = useState([]);

  const getShipmentCost = async (service) => {
    if (userDest && service) {
      const { data } = await API.get("/shipment/cost", {
        params: {
          dest: userDest,
          courier: service,
        },
      });
      const costs = data?.data?.cost[0]?.costs;
      const mappedCost = costs?.map((cost) => {
        const tempObj = {};
        tempObj.value = cost?.cost[0]?.value;
        tempObj.label =
          service.toUpperCase() +
          " " +
          cost?.service +
          " || " +
          cost?.cost[0]?.etd +
          " Day";
        return tempObj;
      });
      setShipment(mappedCost);
    }
  };

  const { mutate } = useMutation(getShipmentCost, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  const onSelectChange = (value) => {
    if (value?.name === "shipmentType") {
      setCost(value?.value);
    } else {
      setCost(0);
      setShipment([]);
      mutate(value?.value);
    }
  };

  if (isAvailable) {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Shipment Services</Form.Label>
            <CustomSelect
              options={shipmentServices}
              placeHolder={"Please select shipment services"}
              name={"shipmentService"}
              onChange={onSelectChange}
            />
          </Form.Group>
          {shipment.length > 0 && (
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Shipment Type</Form.Label>
              <CustomSelect
                options={shipment}
                placeHolder={"Please select shipment type"}
                name={"shipmentType"}
                onChange={onSelectChange}
              />
            </Form.Group>
          )}
        </Form>
      </div>
    );
  } else {
    return <></>;
  }
}
