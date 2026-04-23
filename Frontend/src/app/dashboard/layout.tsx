export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="bg-black">
            {children}
        </section>
    );
}