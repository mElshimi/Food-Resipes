import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
import "./RecipeData.css";


export default function RecipeData() {
  const { baseUrl, requestHeaders, btnloading, allCategories } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state;
  console.log(recipe);
  // console.log(recipe.categoriesIds);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const [recID, setRecId] = useState(null);
  const [recName, setRecName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkIsUpdate, setCheckIsUpdate] = useState(false);
  // destructing useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const cats = [];
  categories.forEach((cat) => {
    let t = { id: cat.id, name: cat.name };
    cats.push(t);
  });
  // console.log(cats);
  const SetValueInputs = () => {
    if (recipe) {
      setCheckIsUpdate(true);
      setRecId(recipe.id);

      setRecName(recipe.name);

      setImage(`https://upskilling-egypt.com:3006/${recipe.imagePath}`);

      reset({
        name: recipe.name,
        description: recipe.description,
        price: recipe.price,
        tagId: recipe.tag.id,
        categoriesIds: recipe.category[0]?.id,
        recipeImage: recipe.imagePath,
      });
    }
  };

  // get categories  data from server
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=${allCategories}&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setCategories(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getTags = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tag `, {
        headers: requestHeaders,
      });
      setTags(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onAddSubmit = async (data) => {
    setIsLoading(true);
    const recipeFormData = appendToFormData(data);
    try {
      const response = await axios.post(`${baseUrl}/Recipe`, recipeFormData, {
        headers: requestHeaders,
      });
      toast.success(`Added ${data.name} Successfully`);
      console.log(recipeFormData.name);
      navigate("/dashboard/recipes");
    } catch (err) {
      console.log(err);
      toast.warning("Failed To Add Recipe");
    }
    setIsLoading(false);
  };

  const onUpdateSubmit = async (data) => {
    setIsLoading(true);
    const recipeFormData = appendToFormData(data);
    try {
      const response = await axios.put(
        `${baseUrl}/Recipe/${recID}`,
        recipeFormData,
        {
          headers: requestHeaders,
        }
      );
      toast.success(`Updated ${recName} Successfully`);
      // console.log(recipeFormData.name);
      navigate("/dashboard/recipes");
    } catch (err) {
      console.log(err);
      toast.warning("Failed To Update Recipe");
    }
    setIsLoading(false);
  };

  // use effect to invoke getCategories after the component mount
  useEffect(() => {
    // invoke getCategories
    getCategories();
    getTags();
    SetValueInputs();
  }, []);

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    formData.append("categoriesIds", data.categoriesIds);
    return formData;
  };
  
  return (
    <>
      <section className={`recipe-list`}>
        <div className={`container-fluid `}>
          <div className="header-recipesData pt-4 pb-5">
            <RecipesListHeader
              btnOnClick={() => {
                navigate("/dashboard/recipes");
              }}
              btnName={"All Recipes"}
            />
          </div>
          <div className="container recipe-form text-end ">
            {/* ************************************** */}


            <form onSubmit={handleSubmit(!checkIsUpdate ? onAddSubmit : onUpdateSubmit)}
            >
              {/* name */}
              <div className="pt-2">
                <input
                  className={`formFieldRecipe  bgInput ${
                    errors.name && "border-danger "
                  }`}
                  type="text"
                  placeholder="Recipe Name"
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />

                {errors.name && (
                  <p className="text-start text-danger ps-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* tags */}
              <div className="pt-2">
                <select
                  className={`formFieldRecipe ${
                    errors.tagId && "border-danger "
                  }`}
                  {...register("tagId", {
                    required: "Tags id are Required",
                  })}
                >
                  {recipe ? (
                    <option value={recipe.tag?.id}>{recipe.tag?.name}</option>
                  ) : (
                    ""
                  )}
                  <option value="">Tags</option>
                  {tags.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.tagId && (
                  <p className="text-start text-danger ps-2">
                    {errors.tagId.message}
                  </p>
                )}
              </div>
              {/* price */}
              <div className="pt-2">
                <div className={`formGroupRecipe`}>
                  <input
                    className={`formFieldRecipe priceInput  bgInput ${
                      errors.price && "border-danger "
                    }`}
                    type="text"
                    placeholder="Recipe Price"
                    {...register("price", {
                      required: "Price is Required",
                      pattern: {
                        value: /^[\d]{1,9}$/gm,
                        message: "Price only numbers",
                      },
                    })}
                  />
                  <span
                    className={`spanInput ${
                      errors.price && "bg-danger text-white border-danger"
                    }`}
                  >
                    EGP
                  </span>
                </div>

                {errors.price && (
                  <p className="text-start text-danger ps-2">
                    {errors.price.message}
                  </p>
                )}
              </div>
              {/* categories */}
              <div className="pt-2">
                {/* ************** */}

                {/* ***************** */}
                <select
                  className={`formFieldRecipe ${
                    errors.categoriesIds && "border-danger "
                  }`}
                  {...register("categoriesIds", {
                    required: "Category id are Required",
                  })}
                >
                  {recipe ? (
                    <option value={recipe.category[0]?.id}>
                      {recipe.category[0]?.name}
                    </option>
                  ) : (
                    ""
                  )}
                  <option value="">Category</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.categoriesIds && (
                  <p className="text-start text-danger ps-2">
                    {errors.categoriesIds.message}
                  </p>
                )}
              </div>
              {/* describtion */}
              <div className="pt-2">
                <textarea
                  rows="5"
                  className={`textArea bgInput formFieldRecipe   ${
                    errors.description && "border-danger "
                  }`}
                  type="text"
                  placeholder="Recipe Description "
                  {...register("description", {
                    required: "Description is Required",
                  })}
                />

                {errors.description && (
                  <p className="text-start text-danger ps-2">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* image  */}
              <div className="py-2 mt-2 text-center formImage">
                <div className={`mb-2 `}>
                  <input
                    className={`inputImg w-100    ${
                      errors.recipeImage && "border-danger "
                    }`}
                    type="file"
                    accept="image/*"
                    placeholder="Recipe Price"
                    {...register("recipeImage", {
                      required: "Image is Required",
                    })}
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                        console.log(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {image ? (
                    <div className="d-flex flex-column justify-content-center  align-items-center">
                      <img src={image} width={60} height={60} alt={fileName} />
                    </div>
                  ) : (
                    <div className="d-flex flex-column justify-content-center  align-items-center text-success">
                      <i className="fa-solid fa-upload  mb-1"></i>
                      <span> Choose a Item Image to Upload</span>
                    </div>
                  )}
                </div>
                <span className="text-dark">
                  {" "}
                  {fileName}{" "}
                  {image ? (
                    <i
                      onClick={() => {
                        setFileName("No Selected File");
                        setImage(null);
                      }}
                      className="fa-solid fa-trash-can  text-success align-self-end  ms-2"
                    ></i>
                  ) : (
                    ""
                  )}
                </span>
                {errors.recipeImage && (
                  <p className="text-start text-danger ps-2">
                    {errors.recipeImage.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  navigate("/dashboard/recipes");
                }}
                className="btn btn-outline-success me-5 px-5  py-1 px-3 fs-6 mt-5 fw-medium"
              >
                Cancel
              </button>
              <button
                className={`btn py-1 px-3 fs-6 mt-5 fw-medium  btnSubmitRecipe`}
              >
                {isLoading
                  ? // <i className="fa-solid fa-spinner fa-spin"></i>
                    btnloading()
                  : ` Save`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
