import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg)",
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title"> Un nuevo día</p>
        <p className="journal__entry-content">
          Occaecat non aute nulla excepteur sunt cupidatat eu.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
