import BreadCrumb from '@/components/common/BreadCrumb'
import roleApiRequest from '@/http-request/roles'
import TableItem from './_components/TableItem'

export default async function Roles() {
  const roles = await roleApiRequest.getAll()

  const segments = [
    {
      name: 'Trang chủ',
      isLink: true,
      isCopy: false,
      href: '/',
    },
    {
      name: 'Phân quyền',
      isLink: true,
      isCopy: false,
      href: `/roles`,
    },
  ]

  return (
    <div>
      <BreadCrumb segments={segments} />
      <table className="c-table mt-2">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Code</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {roles.roles.map((item, index) => (
            <TableItem key={item.id} role={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
