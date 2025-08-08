import Image, {StaticImageData} from "next/image";

const AvatarGroup = ({ profiles }: { profiles: StaticImageData[] }) => {
    return (
        <div className="flex">
            {profiles.map((profile, index) => (
                <Image
                    key={index}
                    style={{ zIndex: profiles.length - index }}
                    className="avatar select-none"
                    src={profile.src}
                    width={32}
                    height={32}
                    alt=""
                />
            ))}
        </div>
    );
};

export default AvatarGroup;