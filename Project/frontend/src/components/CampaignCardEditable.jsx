import Axios from "axios";
import React, { useEffect, useState } from "react";

function CampaignCard(props) {
  const Type = sessionStorage.getItem("userType");
  async function handleDelete() {
    const response = await Axios.delete(
      `${
        process.env.REACT_APP_API
      }/${Type.toLowerCase()}/deleteCampaign?campaignAlias=${props.alias}`,
      { withCredentials: true }
    );

    if (response.data.success) {
      alert(response.data.message);
      window.location.reload();
    }
  }
  const [cover, setCover] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_API}/campaign/cover?campaignAlias=${props.alias}`
    )
      .then((res) => {
        setCover(res.data.cover);
        setLoading(false);
      })
      .catch((error) => {});
  });
  return (
    <>
      <div class="row justify-content-center">
        <div class="col-11 px-4">
          <div class=" row flex-lg-row align-items-center g-5 py-2 px-4 my-3 post_11 rounded-4">
            <div class="col-12 col-xxl-6 p-0 mt-0">
              {loading ? (
                <img
                  // src={`data:image/jpeg;base64,${cover}`}
                  class="d-flex w-100 img-fluid rounded-4"
                  alt="Bootstrap Themes"
                  loading="lazy"
                />
              ) : (
                <img
                  src={`data:image/jpeg;base64,${cover}`}
                  class="d-flex w-100 img-fluid rounded-4"
                  alt="Bootstrap Themes"
                  loading="lazy"
                />
              )}
            </div>
            <div class="col-12 col-xxl-6 mt-0 ">
              <h1 class="lh-1 my-3 rounded-4 text-center text-white bg-dark py-2 font fs-1">
                {props.title}
              </h1>
              <div class="bgd-clr p-3 rounded-4">
                <p class="text-center">{props.vision}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    onClick={() =>
                      (window.location.href = `/edit_Campaign/${props.alias}`)
                    }
                    type="button"
                    class="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-clr btn-lg px-5 me-md-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CampaignCard;
