import React from "react"
import {CalendarOutlined} from "@ant-design/icons"
import {Checkbox, Collapse, List, Space, Typography} from "antd"
import {Calendar} from "../../app/types";

const {Text} = Typography
const {Panel} = Collapse

interface CalendarListProps {
  data: Calendar[]
  loading: boolean
  error?: string
  isSelected: (calendar: Calendar) => boolean
  onSelect: (calendar: Calendar) => void
}

function CalendarList({data, loading, error, onSelect, isSelected}: CalendarListProps) {
  const renderCalendars = () => {
    if (error) {
      return (<Text type="danger">{error}</Text>)
    } else {
      return (
        <List
          itemLayout="vertical"
          dataSource={data}
          loading={loading}
          renderItem={calendar => (
            <List.Item id={calendar.id}>
              <Checkbox
                checked={isSelected(calendar)}
                onChange={(e) => onSelect(calendar)}
              >
                {calendar.id}
              </Checkbox>
            </List.Item>
          )}/>
      )
    }
  }


  return (
    // @ts-ignore
    <Collapse defaultActiveKey={['1']}>
      {/*@ts-ignore*/}
      <Panel header={<Space><CalendarOutlined/>{"Calendars"}</Space>} key="1">
        {renderCalendars()}
      </Panel>
    </Collapse>
  )
}

export default CalendarList
