import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActivity,
  getActivities,
  filterActivities,
} from "../../redux/actions/index";
import Activity from "../Activity/Activity";
import style from "./Activities.module.css";

const Activities = ({ activity }) => {
  const { activities, allActivities } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(removeActivity(id));
    alert("Activity removed");
  };

  useEffect(() => {
    if (activity === "All Activities") dispatch(getActivities());
    if (activity !== "All Activities")
      dispatch(filterActivities(activity.toLowerCase()));
  }, [dispatch, activity]);

  return (
    <>
      {typeof allActivities === "string" && <div className={style.noAct}>{allActivities}</div>}
      {!allActivities && !activities && activity === "All Activities" && (
        <div className={style.noAct}>No planned activities</div>
      )}
      <div className={style.activitiesContainer}>
      {activity === "All Activities" &&
        typeof allActivities !== "string" &&
        allActivities &&
        allActivities.map((activity) => (
          <Activity 
            key={activity.id}
            id={activity.id}
            handleClose={handleClose}
            name={activity.name}
            difficulty={activity.difficulty}
            duration={activity.duration}
            season={activity.season}
            Countries={activity.Countries}
          />
        ))}
      {activity !== "All Activities" &&
        typeof activities !== "string" &&
        activities?.map((activity) => (
          <Activity 
            key={activity.id}
            id={activity.id}
            handleClose={handleClose}
            name={activity.name}
            difficulty={activity.difficulty}
            duration={activity.duration}
            season={activity.season}
            Countries={activity.Countries}
          />
        ))}
      </div>
      {activity !== "All Activities" && !activities.length && (
        <div className={style.noAct}>No activities planned for this {activity.toLowerCase()}
        </div>
      )}
    </>
  );
};

export default Activities;
