import BreadCrumb from '@/components/common/BreadCrumb'
import basicApiRequest from '@/http-request/basics'
import EditForm from './_components/EditForm'

type EditBasicProps = {
  params: { id: string }
}

export default async function EditBasic({ params: { id } }: EditBasicProps) {
  const basic = await basicApiRequest.getOne(id)

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
    {
      name: 'Chỉnh sửa',
      isLink: false,
      isCopy: false,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <EditForm basic={basic.basic} />
    </div>
  )
}
