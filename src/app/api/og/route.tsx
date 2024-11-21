import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const imageUrl = searchParams.get("image");

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    const allowedDomain = "https://img.cs2data.info";
    const url = new URL(imageUrl);

    if (url.origin !== allowedDomain) {
        return new Response("Invalid image source", { status: 403 });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#121212",
                    position: "relative",
                }}
            >
                <img
                    src={imageUrl}
                    alt="og image"
                    style={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >
                    CS2DATA.info
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
