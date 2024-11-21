import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const encodedImageUrl = searchParams.get("image");

    if (!encodedImageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    const decodedImageUrl = decodeBase64(encodedImageUrl);

    const allowedDomain = "https://img.cs2data.info";
    const url = new URL(decodedImageUrl);

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
                    backgroundColor: "#212121",
                    position: "relative",
                }}
            >
                <img
                    src={decodedImageUrl}
                    alt="og image"
                    style={{
                        width: "85%",
                        height: "85%",
                        objectFit: "contain",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        color: "white",
                        fontSize: "30px",
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

function decodeBase64(encoded: string): string {
    const decoded = atob(encoded);
    return decoded;
}
