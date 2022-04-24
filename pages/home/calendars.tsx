import React, {useEffect, useState} from "react"
import {CalendarOutlined} from "@ant-design/icons"
import {Checkbox, Collapse, List, Space, Typography} from "antd"
import {getCalendarListAsync, selectCalendarState} from "../../features/availability/calendarsSlice"
import {useAppDispatch} from "../../app/hooks";
import {GoogleCalendar} from "../../app/types";
import {useSelector} from "react-redux";

const {Text} = Typography
const {Panel} = Collapse

function CalendarList() {
  const {data: calendars, error, status} = useSelector(selectCalendarState)
  const dispatch = useAppDispatch()
  const [selectedCalendars, setSelectedCalendars] = useState<GoogleCalendar[]>([])
  const renderCalendars = () => {
    switch (status) {
      case "error":
        return (<Text type="danger">{error}</Text>)
      default:
        return (
          <List
            itemLayout="vertical"
            dataSource={calendars}
            loading={status === "busy"}
            renderItem={calendar => (
              <List.Item id={calendar.id}>
                <Checkbox
                  checked={selectedCalendars && selectedCalendars.includes(calendar)}
                  onChange={(e) => onCalendarSelected(e.target.checked, calendar)}
                >
                  {calendar.id}
                </Checkbox>
              </List.Item>
            )}/>
        )
    }
  }

  useEffect(() => {
    if (status !== "busy") {
      dispatch(getCalendarListAsync())
    }
  }, [])

  function onCalendarSelected(checked: Boolean, calendar: GoogleCalendar) {
    if (checked && !selectedCalendars.includes(calendar)) {
      setSelectedCalendars([...selectedCalendars, calendar])
    } else {
      setSelectedCalendars(
        selectedCalendars.filter((c) => c.id !== calendar.id)
      )
    }
  }

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header={<Space><CalendarOutlined/>{"Calendars"}</Space>} key="1">
        {renderCalendars()}
      </Panel>
    </Collapse>
  )
}

export default CalendarList
