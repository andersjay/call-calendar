import { useState } from "react";
import { CalenderStep } from "./CalendarSteps";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm(){

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime(){
    setSelectedDateTime(null)
  }

  if(selectedDateTime){
    return <ConfirmStep schedulingDate={selectedDateTime} onCancelConfirmation={handleClearSelectedDateTime}/>
  }

  return(
    <CalenderStep onSelectDateTime={setSelectedDateTime}/>
    // <ConfirmStep/>
  )
}