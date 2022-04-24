import {FreeBusyCalendar} from "../../app/types";
import {Table, Tag, Typography} from "antd";
import {ColumnType} from "antd/es/table";

const {Text} = Typography

interface FreeBusyTableProps {
  loading: boolean,
  error?: string,
  data: FreeBusyCalendar.Item[]
}

const errorColumn: ColumnType<FreeBusyCalendar.Error> = {
  title: "Errors",
  dataIndex: "errors",
  render: errors => (<>
    {errors
      ? errors.map((error: FreeBusyCalendar.Error, i: number) =>
        <Tag color="red" key={i}>{error.reason}</Tag>)
      : <></>
    }
  </>)
}
const busyColumn: ColumnType<FreeBusyCalendar.Error> = {
  title: "Busy",
  dataIndex: "busy",
  render: busies => (busies.map((busy: FreeBusyCalendar.Busy, i: number) => <Tag color="warning" key={i}>{busy.start} - {busy.end}</Tag>))
}
const columns: any = [
  {
    title: "ID",
    dataIndex: "id",
  },
  busyColumn,
  errorColumn
]
export default function FreeBusyTable({loading, error, data}: FreeBusyTableProps) {
  return (
    error
      ? <Text type="danger">{error}</Text>
      : <Table columns={columns} loading={loading} dataSource={data} rowKey={c => c.id}/>
  )
}