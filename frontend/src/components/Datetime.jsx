import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ClearIcon from '@mui/icons-material/Clear';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import Button from '@mui/material/Button'
export default function MaterialDatePicker({ onCloseEntry, onAdd, date, timeElapsed, sleepTime, wakeUpTime, match }) {

  const [entry, setEntry] = useState({
    date: new Date(),
    sleepTime: new Date(),
    wakeUpTime: new Date()
  });

  const submitEntry = () => {
    onCloseEntry();
    let elapsed = Math.abs(entry.sleepTime.getTime() - entry.wakeUpTime.getTime());
    entry.sleepTime.getHours() > entry.wakeUpTime.getHours() ? entry['timeElapsed'] = (86400000 - elapsed)/3600000 :  entry['timeElapsed'] = (elapsed)/3600000
    console.log(elapsed/3600000);
    console.log(entry);
    onAdd(entry);
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry)
    };

    fetch(`/api/entries/${match.params.id}`, options)
    .then(response => console.log(response.json()) );

  };

  return (
    <form className="entry-form">
      <ClearIcon className="cancel" onClick={onCloseEntry}></ClearIcon>
      <h4>Make Your Entry.</h4>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id="date"
          label="Basic example"
          value={entry.date}
          onChange={value => {
            setEntry(prevNote => {
              return {
                ...prevNote,
                [date]: value
              };
            });
          }}
          animateYearScrolling
        />
        <div className="time">
          <TimePicker
            id="sleepTime"
            ampm={false}
            value={entry.sleepTime}
            onChange={value => {
              setEntry(prevNote => {
                return {
                  ...prevNote,
                  [sleepTime]: value
                };
              });
            }}
            label="Time of Sleep"
          />
          <TimePicker
            id="wakeUpTime"
            clearable
            ampm={false}
            label="Wake Up Time"
            value={entry.wakeUpTime}
            onChange={value => {
              setEntry(prevNote => {
                return {
                  ...prevNote,
                  [wakeUpTime]: value
                };
              });
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
      <Button variant="contained" onClick={submitEntry}>Save</Button>
    </form>
  );

}
