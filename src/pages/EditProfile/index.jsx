import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { HeroLayer, LoadingApp, Navbars } from "../../containers";
import {
  CustomForm,
  CustomTextArea,
  CustomSelect,
  InputFileButton,
} from "../../components";
import { UserContext } from "../../context/UserContext";
import attachment from "../../assets/icons/attachment.png";
import { useQuery } from "react-query";
import API from "../../services";
import { toast } from "react-toastify";

export default function EditProfile() {
  document.title = "WaysBook | Edit Profile";
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    fileUrl: "",
    file: {},
    cityId: "",
    provinceId: "",
    gender: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceValue, setProvinceValue] = useState({});
  const [citiesValue, setCitiesValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state?.user) {
      const user = state?.user;
      setForm({
        name: user?.name,
        address: user?.profile?.address || "",
        phoneNumber: user?.profile?.phoneNumber || "",
        fileUrl: user?.profile?.profilePict || "",
        file: {},
        cityId: user?.profile?.regionId || "",
        provinceId: user?.profile?.provinceId || "",
        gender: user?.profile?.gender || "",
      });
    }
  }, [state?.user, state?.user?.profile]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = ({ file, url }) => {
    setForm({
      ...form,
      file: file,
      fileUrl: url,
    });
  };

  const getProvince = async () => {
    const { data } = await API.get("/shipment/province");
    const mappedData = data?.data?.province?.map((province) => {
      if (form?.provinceId === province?.idraja) {
        setProvinceValue({
          value: province?.idraja,
          label: province?.name,
        });
      }

      return {
        value: province?.idraja,
        label: province?.name,
      };
    });
    setProvinces(mappedData);
    return mappedData;
  };

  const getCities = async () => {
    const { data } = await API.get("/shipment/cities", {
      params: { province: form?.provinceId },
    });

    const mappedData = data?.data?.cities?.map((city) => {
      return {
        value: city.rajaCityId,
        label: city.type + " " + city.name,
      };
    });

    setCities(mappedData);
    return mappedData;
  };

  const { isLoading: provinceLoading } = useQuery(
    ["provincesChace"],
    getProvince
  );
  const { isLoading: citiesLoading } = useQuery(
    ["citiesChace", form?.provinceId],
    getCities,
    {
      enabled: !!form?.provinceId,
    }
  );

  const onSelectChange = (e) => {
    setForm({
      ...form,
      [e.name]: e.value.toString().toLowerCase(),
    });
  };

  useEffect(() => {
    if (form?.cityId) {
      cities?.forEach((city) => {
        if (parseInt(city?.value) === parseInt(form?.cityId)) {
          setCitiesValue({
            value: city.value,
            label: city.label,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.cityId, cities]);

  useEffect(() => {
    if (form?.provinceId) {
      provinces?.forEach((province) => {
        if (parseInt(province?.value) === parseInt(form?.provinceId)) {
          setProvinceValue({
            value: province.value,
            label: province.label,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.provinceId, provinces]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formBody = new FormData();

    const { address, cityId, name, phoneNumber, file, provinceId, gender } =
      form;

    formBody.append("address", address);
    formBody.append("regionId", cityId);
    formBody.append("name", name);
    formBody.append("phoneNumber", phoneNumber);
    if (file?.name) {
      formBody.append("profile", file);
    }
    formBody.append("provinceId", provinceId);
    formBody.append("gender", gender);

    const { data, status } = await API.patch("/profile", formBody).catch(
      (err) => err?.response
    );

    if (status !== 201) {
      console.log("hai");
      setIsLoading(false);
      toast.error(data?.message);
    } else {
      toast.success("Success Update Data");
      dispatch({
        type: "USER_UPDATE",
        payload: { user: data?.data?.user },
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <LoadingApp isLoading={provinceLoading || citiesLoading || isLoading} />
      <Navbars />
      <HeroLayer />
      <Container className="mt-5">
        <h2 className="mb-3">Edit Profile</h2>
        <Form onSubmit={onSubmit}>
          {form?.fileUrl && (
            <img
              src={form?.fileUrl}
              alt="Preview Profile"
              width={250}
              height={150}
              className={"rounded mb-3"}
            />
          )}
          <InputFileButton
            id={"profile"}
            src={attachment}
            accept={"image/jpg,image/png,image/jpeg"}
            alt={"Profile Picture"}
            fileName={form?.file?.name}
            onChangeHandler={onFileChange}
            className={"mb-3"}
          />
          <CustomForm
            name={"name"}
            placeholder={"Insert your name"}
            type={"text"}
            value={form?.name}
            onChangeHandler={onChangeHandler}
          />
          <CustomForm
            name={"phoneNumber"}
            placeholder={"Insert your phone number"}
            type={"number"}
            value={form?.phoneNumber}
            onChangeHandler={onChangeHandler}
            className={"mt-3"}
          />
          <CustomSelect
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            placeHolder={"Please Select Your Gender"}
            className={"mt-3"}
            onChange={onSelectChange}
            name={"gender"}
            value={
              form?.gender && {
                value: form?.gender,
                label:
                  form?.gender?.charAt(0).toUpperCase() +
                  form?.gender?.slice(1),
              }
            }
          />
          <CustomSelect
            options={provinces}
            placeHolder={"Please Select Your Provinces"}
            className={"mt-3"}
            onChange={onSelectChange}
            name={"provinceId"}
            value={provinceValue}
          />
          <CustomSelect
            options={cities}
            placeHolder={"Please Select Your Citiy"}
            className={"mt-3"}
            onChange={onSelectChange}
            name={"cityId"}
            value={citiesValue}
          />
          <CustomTextArea
            name={"address"}
            placeholder={"Please insert your address detail"}
            value={form?.address}
            onChangeHandler={onChangeHandler}
            className={"mt-3"}
          />
          <div className="mt-3 text-end">
            <button className="darkButton">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
