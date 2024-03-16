export const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex flex-col justify-center align-middle m-auto p-2 max-w-[1080px]">
      {children}
    </main>
  );
};
