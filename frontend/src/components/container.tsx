export const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col justify-center align-middle m-auto p-2 max-w-[1080px]">
      {children}
    </div>
  );
};
