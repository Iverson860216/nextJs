import Image from 'next/image';

const imageComponent = (props) => {

    return(
        <>
            <Image
                src={'/images/profile.jpg'}
                alt='Iverson'
                height={144}
                width={144}
            />
        </>
    )
}
export default imageComponent;