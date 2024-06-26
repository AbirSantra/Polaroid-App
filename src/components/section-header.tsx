const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-base font-medium">{title}</h2>
      <div className="h-[1px] w-full bg-gray-200"></div>
    </div>
  );
};

export default SectionHeader;
