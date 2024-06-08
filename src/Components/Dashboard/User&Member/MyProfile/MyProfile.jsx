import useAuth from "../../../../Hooks/useAuth";
import useMember from "../../../../Hooks/useMember";


const MyProfile = () => {
    const { user } = useAuth();
    const [isMember] = useMember();
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-center">Welcome <span className="text-green-600">{user.displayName}!</span></h1>

            <div className="card w-2/3 bg-base-200 shadow-xl mt-10 border">
                <figure className="px-10 pt-10">
                    <img src={user.photoURL} className="rounded-full w-[200px]" />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title text-2xl">{user.displayName}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <div>
                        {
                            isMember?
                            <div>fsd</div>
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;