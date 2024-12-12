import NavBar from "@/components/custom/nav";

export default function Home() {
    return (
        <div style={{
            backgroundImage: "url('/a_group_of_flowers_in_a_vase.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
        }}>
            <NavBar />
        </div>
    );
}
