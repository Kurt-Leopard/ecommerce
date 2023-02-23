export default function Slice({ slice }) {
  const apps = slice?.main?.apps || []
  // console.log(apps)
  return (
    <div className="max-w-screen-xl mx-auto w-full mt-[100px]">
      <div className="gap-8 columns-3">
        {apps.map((e, i) => (
          <div key={i} className="border-2 w-full p-[10px]">
            <p className="mb-[5px] font-bold text-[18px]">{e.attributes.title}</p>
            <div className="" dangerouslySetInnerHTML={{__html: e.attributes?.data?.main?.content}} />
          </div>
        ))}
      </div>
    </div>
  )
}
