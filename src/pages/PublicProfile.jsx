import ItemList from "@/components/shared/ItemList";
import Loader from "@/components/shared/Loader";
import { useDeveloperProfile } from "@/hooks/useDeveloperProfile";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
  const { id } = useParams();
  const { data: developer, isLoading: isDeveloperLoading, isError: isDeveloperError } = useDeveloperProfile(id);

  if (isDeveloperLoading) {
    return <Loader />;
  }

  if (isDeveloperError) {
    console.error(isDeveloperError);
    return <p>Error: {isDeveloperError.message}</p>;
  }


  return (
    <div className="min-h-full ">
      <h1 className="text-3xl md:text-6xl mb-14 col-span-2 justify-self-start">
        Perfil de <span className="font-semibold font-poppins">{developer?.username}</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="flex justify-items-center items-center flex-col gap-2 w-fit max-w-xl px-4 lg:px-10 z-10 p-8 rounded-xl bg-white/5 border-2 border-transparent shadow-[0_0_10px_rgba(8,223,223,0.7),0_0_20px_rgba(8,223,223,0.6),0_0_30px_rgba(8,223,223,0.5),0_0_20px_rgba(240,92,186,0.4),0_0_30px_rgba(24,224,234,0.3),0_0_40px_rgba(239,64,181,0.2)] backdrop-blur" >
          <img
            src={developer?.photo}
            alt="Profile"
            className="rounded-full w-40 h-40"
          />

          <div>
            <p className="text-3xl font-semibold my-8 text-center">{developer?.name}</p>
            <p className="text-xl font-semibold my-8 text-center">{developer?.stack ? `Desarollador ${developer.stack_name}` : `Desarollador`}</p>
          </div>
        </section>


        <div>

          <section>
            <h2 className="text-3xl font-semibold">Sobre el desarollador</h2>
            <p>  {
              developer.about_me ?
                developer.about_me
                :
                "¡Este desarrollador aún no ha escrito su historia, pero seguro que está creando algo genial! 🎉🚀"
            }
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-semibold">Lenguajes de programación</h2>
            <ItemList items={developer.language_names} title="Lneguajes de programmación" />
          </section>
          <section>
            <h2 className="text-3xl font-semibold">Stack</h2>
            <ItemList items={developer.stack_name} title="Stack" />
          </section>
          <section>
            <h2 className="text-3xl font-semibold">Nivel</h2>
            <p>{developer.level_name ? developer.level_name : "Junior"}</p>
          </section>


          <section>
              



          </section>

        </div>


      </div>
    </div>
  );
};

export default PublicProfile;
