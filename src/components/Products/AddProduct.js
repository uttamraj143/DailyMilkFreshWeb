import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { addProduct, updateProduct } from "store/products";
import "./Products.scss";

export default function AddProduct(props) {
  const [product, setProductProfile] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onSubmit = (data) => {
    setProductProfile({ ...product, ...data });
    submitDataFinal();
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitDataFinal = () => {
    let data = {
      product,
      access_token: props.access_token,
    };
    addProduct(data)
      .then((res) => {
        alert("success");
        setTimeout(() => {
          props.toggleAddProduct(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("Failed", err.response);
        alert("Failed");
      });
  };

  const verifyRegister = (code, otp) => {
    // verifyRegisteredProduct(code, otp)
    //   .then((res) => {
    //     alert("successfully saved");
    //
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };

  // const submitData = useCallback(debounce(submitDataFinal, 5000), []);

  return (
    <div className="Products__sub-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Name"
            {...register("name", { required: true, min: 3 })}
          ></input>
          {errors.name && <span>Name needs to be at least 3 characters</span>}

          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            placeholder="Price"
            type="number"
            {...register("price", {
              required: true,
              min: 1,
            })}
          />
          {errors.price && <span>This field is required</span>}
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="description"
            placeholder="Description"
            {...register("description", { required: true, min: 5 })}
          ></input>
          <span className="focus-border"></span>
        </div>
        {errors.description && (
          <span>Please enter a valid description min 8 char"</span>
        )}

        <div className="Login__col-3">
          <input
            className={
              errors.length
                ? "Products__refresh-button Products__refresh-button-disabled"
                : "Products__refresh-button"
            }
            type="submit"
            value="Add New Product"
          ></input>
        </div>
      </form>
    </div>
  );
}
