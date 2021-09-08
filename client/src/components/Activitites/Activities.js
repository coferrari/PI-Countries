import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeActivity, getActivities, filterActivities } from "../../actions/index";

const Activity = ({activity}) => {
  const { activities, allActivities } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(removeActivity(id));
    alert("Activity removed");
  };

  useEffect(() => {
    if (activity === "All Activities") dispatch(getActivities());
    if (activity !== "All Activities") dispatch(filterActivities(activity.toLowerCase()));
  }, [dispatch, activity])

  return (
    <>
      //put para modificar la actividad
      {typeof allActivities === "string" && <div>{allActivities}</div>}
      {!allActivities && !activities && activity === "All Activities" && <div>No planned activities</div>}
      {activity === 'All Activities' && typeof allActivities !== "string" && allActivities &&
        allActivities.map((activity) => (
            <div key={activity.id}>
                <button onClick={() => handleClose(activity.id)}>Remove</button>
                <div>
                    <h1>{activity.id}</h1>
                    <h3>{activity.name}</h3>
                    {activity.Countries?.map((country) => (
                        <ul key={country.name}>
                            <li>{country.name}</li>
                        </ul>
                    ))}
                    <ul>
                        <li>{activity.difficulty}</li>
                        <li>{activity.duration}</li>
                        <li>{activity.season}</li>
                    </ul>
                </div>
            </div>
        ))}
      {activity !== 'All Activities' && typeof activities !== "string" && 
      activities?.map((activity) => (
          <div key={activity.id}>
            <button onClick={() => handleClose(activity.id)}>Remove</button>
            <div>
              <h1>{activity.id}</h1>
              <h3>{activity.name}</h3>
              {activity.Countries?.map((country) => (
                <ul key={country.name}>
                  <li>{country.name}</li>
                </ul>
              ))}
              <ul>
                <li>{activity.difficulty}</li>
                <li>{activity.duration}</li>
                <li>{activity.season}</li>
              </ul>
            </div>
          </div>
        ))}
        {activity !== 'All Activities' && !activities && <div>No activities planned for this {activity.toLowerCase()} :(</div>}
    </>
  );
};

export default Activity;
