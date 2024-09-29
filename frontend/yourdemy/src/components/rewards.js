import React from "react";

const Rewards = () => {
  const rewardsContent = [
    "Course A is at 10% discount",
    " Course B is at 20% discount",
    " Course C is at 30% discount",
    " Course D is at 10% discount",
  ];
  return (
    <div className="rewards-page">
      <h3 style={{marginLeft:'20px'}}>My Rewards</h3>

      <div>
        <span className="rewards-span">
          Points Earned: 2000{" "}
          <span class="material-symbols-outlined">celebration</span>
        </span>

        {rewardsContent.map((item) => {
          return (
            <div className="outer-div-rewards">
              <span class="material-symbols-outlined">verified</span>
              <div className="item-title"> {item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rewards;
