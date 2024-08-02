import { TEvent } from "../types/eventType";

export const convertEventObjectToFormData = (data: TEvent): FormData => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("eventLink", data.eventLink ?? "");
  formData.append("isFree", data.isFree.toString());
  formData.append("startDate", data.startDate ?? "");
  formData.append("endDate", data.endDate ?? "");
  formData.append("occurrence", data.occurrence ?? "");
  formData.append("location", data.location ?? "");
  formData.append("addressLine1", data.addressLine1 ?? "");
  formData.append("city", data.city ?? "");
  formData.append("state", data.state ?? "");
  formData.append("zip", data.zip ?? "");

  data.categories?.forEach((category, index) => {
    formData.append(`categories[${index}]`, category);
  });

  data.ages?.forEach((age, index) => {
    formData.append(`ages[${index}]`, age);
  });

  if (data.imageFiles) {
    Array.from(data.imageFiles).forEach((image) => {
      formData.append(`imageFiles`, image);
    });
  } else {
    formData.append("imageFiles", "");
  }

  return formData;
};
