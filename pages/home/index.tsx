import {LogoutOutlined, SearchOutlined} from "@ant-design/icons"
import {Button, Col, DatePicker, Layout, Row, Space, TimePicker} from "antd"
import {signOut} from "next-auth/react"
import {Calendar, DateTime, NextAuthPage} from "../../app/types"
import CalendarList from "./calendars";
import {useSelector} from "react-redux";
import {getCalendarListAsync, selectCalendarState} from "../../features/availability/calendarsSlice";
import {useAppDispatch} from "../../app/hooks";
import {useEffect, useState} from "react";
import {searchAsync, selectAvailableCalendarState} from "../../features/availability/availableCalendars";
import FreeBusyTable from "./free_busy_table";

const {Content} = Layout
type DateRange = [DateTime | null, DateTime | null] | null

const HomePage: NextAuthPage = () => {
  const {data: calendars, error: calendarsError, status: calendarsStatus} = useSelector(selectCalendarState)
  const {
    data: freeBusyCalendars,
    error: freeBusyError,
    status: freeBusyStatus
  } = useSelector(selectAvailableCalendarState)
  const dispatch = useAppDispatch()
  const [date, setDate] = useState<DateTime | null>(null)
  const [timeRange, setTimeRange] = useState<DateRange>(null)
  const [selectedCalendars, setSelectedCalendars] = useState<Calendar[]>([])

  useEffect(() => {
    if (calendarsStatus !== "busy") {
      dispatch(getCalendarListAsync())
    }
  }, [])

  function onSelectChange(calendar: Calendar) {
    if (selectedCalendars.includes(calendar)) {
      setSelectedCalendars(selectedCalendars.filter(c => c.id !== calendar.id))
    } else {
      setSelectedCalendars(selectedCalendars.concat(calendar))
    }
  }

  function onDateChange(date: DateTime | null, dateString: string) {
    setDate(date)
  }

  function onTimeRangeChange(timeRange: DateRange, s: string[]) {
    setTimeRange(timeRange)
  }

  function onSearchClick() {
    if (date && timeRange?.[0] && timeRange?.[1] && selectedCalendars.length > 0) {
      dispatch(searchAsync({date, timeRange: [timeRange[0], timeRange[1]], calendars: selectedCalendars}))
    }
  }

  return (
    <Content style={{padding: "24px", backgroundColor: "#FFFFFF"}}>
      <Row gutter={[26, 18]}>
        <Col lg={{span: 6}} xs={{span: 24}}>
          <CalendarList error={calendarsError}
                        loading={calendarsStatus === "busy"}
                        data={calendars}
                        isSelected={c => selectedCalendars.includes(c)}
                        onSelect={onSelectChange}/>
        </Col>
        <Col lg={{span: 18}} xs={{span: 24}}>
          <Space direction="vertical" size="large" style={{width: "100%"}}>
            <Row gutter={[26, 18]}>
              <Col lg={{span: 18}}>
                <Space direction="horizontal">
                  <DatePicker onChange={onDateChange} value={date}/>
                  <TimePicker.RangePicker onChange={onTimeRangeChange}
                                          value={timeRange}
                                          showSecond={false}
                                          format="hh:mm A" use12Hours/>
                  <Button type="primary" shape="round" icon={<SearchOutlined/>}
                          onClick={onSearchClick}>
                    Search
                  </Button>
                </Space>
              </Col>
              <Col lg={{span: 6}} style={{textAlign: "center"}}>
                <Button
                  type="dashed"
                  shape="round"
                  icon={<LogoutOutlined/>}
                  onClick={() => signOut()}>
                  Logout
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FreeBusyTable
                  data={freeBusyCalendars}
                  loading={freeBusyStatus === "busy"}
                  error={freeBusyError}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Content>
  )
}

HomePage.authenticationRequired = true
export default HomePage
