import Script from "next/script";

export default function Scripts(){
    /**
     * strategy :
     *  1.  lazyOnload:
     *      告訴 Next.js 在瀏覽器閒置期間慵懶地載入此特定腳本
     *  2.  onLoad:
     *      用於當腳本載入完成後要立即執行的任何 JavaScript 程式碼。
     */
    return(
        <>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                console.log(`Script was loaded successfully!`)
                }
            />
        </>
    )
}