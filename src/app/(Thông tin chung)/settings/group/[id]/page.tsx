import BreadCrumb from '@/components/common/BreadCrumb'
import basicApiRequest from '@/http-request/basics'
import TableItem from './_components/TableItem'

type BasicsProps = {
  params: { id: string }
}

export default async function Basics({ params: { id } }: BasicsProps) {
  const basics = await basicApiRequest.getAll({ group_id: +id })

  const segments = [
    {
      name: 'Trang chủ',
      isLink: true,
      isCopy: false,
      href: '/',
    },
    {
      name: 'Thông tin chung',
      isLink: true,
      isCopy: false,
      href: `/basics`,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <table className="c-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Shell</th>
            <th>Giá trị tiếng Việt</th>
            <th>Giá trị tiếng Anh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {basics.basics.map((basic, index) => (
            <TableItem key={basic.id} basic={basic} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
