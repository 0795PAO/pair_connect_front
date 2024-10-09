import ContactsModal from "@/components/profile/ContacsModal";
import ItemList from "@/components/shared/ItemList";
import Loader from "@/components/shared/Loader";
import Modal from "@/components/shared/Modal";
import PopupWithInput from "@/components/shared/PopupWithInput";
import SimplePopUp from "@/components/shared/SimplePopUp";
import { Button } from "@/components/ui/button";
import { useConfirmParticipant } from "@/hooks/useConfirmParticipant";
import { useDeveloperProfile } from "@/hooks/useDeveloperProfile";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
  const { id, sessionId } = useParams();
  console.log(sessionId);
  const [showPopup, setShowPopup] = useState(false);
  const [showSimplePopUp, setShowSimplePopUp] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { data: developerData, isLoading: isDeveloperLoading, isError: isDeveloperError } = useDeveloperProfile(id, sessionId);
  const confirmParticipant = useConfirmParticipant();


  if (isDeveloperLoading) {
    return <Loader />;
  }

  if (isDeveloperError) {
    console.error(isDeveloperError);
    return <p>Error: {isDeveloperError.message}</p>;
  }

  const developer = developerData?.profile_data;
  const hasPermission = developerData?.has_permission;
  console.log(hasPermission)



  const handleConfirmDeveloper = () => {
    confirmParticipant.mutate({ sessionId, username: developer?.username });
    setOpenConfirm(false);
  }

  // const isConfirmedParticipant = isConfirmed.mutate({ sessionId, })


  return (
    <div className="px-8 lg:h-[80vh]">
      <h1 className="text-4xl md:text-6xl mb-10 text-primaryText justify-self-start">
        Perfil de <span className="font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">{developer?.username}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10 items-stretch">
        <section className="flex flex-col items-center justify-between bg-card p-10 rounded-lg overflow-y-auto">
          <div className="flex flex-col items-center">
            <img
              src={developer?.photo}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
            />
            <p className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text">
              {developer?.name}
            </p>
            <p className="text-xl font-medium mt-4 text-textPrimary">
              {developer?.stack ? `Desarrollador ${developer.stack_name}` : `Desarrollador Fullstack`}
            </p>
          </div>
        </section>

        <div>
          <section className="bg-card p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-textPrimary hover:text-secondary transition duration-300">
              Sobre el desarrollador
            </h2>
            <p className="mt-4 text-base">
              {developer.about_me ? developer.about_me : "¡Este desarrollador aún no ha escrito su historia, pero seguro que está creando algo genial! 🎉🚀"}
            </p>
          </section>

          <section className="bg-card p-4 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-textPrimary  hover:text-secondary transition duration-300">
              Lenguajes de Programación
            </h2>
            {
              developer?.language_names?.length > <ItemList items={developer?.language_names}/>
            }
          </section>
          <div className="grid grid-cols-2 items-center w-full gap-4">
            <section className="bg-card p-4 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold text-textPrimary  hover:text-secondary transition duration-300">
                Stack
              </h2>
              <p className="mt-4 text-base">
                {developer.stack_name ? developer.stack_name : "Fullstack"}
              </p>
            </section>

            <section className="bg-card p-4 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold text-textPrimary hover:text-secondary transition duration-300">
                Nivel
              </h2>
              <p className="mt-4 text-base">
                {developer.level_name ? developer.level_name : "Junior"}
              </p>
            </section>
          </div>



        </div>

      </div>


      {
        hasPermission ?
          (
            <div className="flex gap-4 mt-5">
              <Button
                variant="outline"
                className=""
                onClick={() => setOpenContacts(true)}
              >
                Ver contactos
              </Button>

              <Button
                variant="specialShadow"
                className=""
                onClick={handleConfirmDeveloper}
              >
                Confirmar participación
              </Button>
              :
              <p>Has confirmado este desarrollador</p>
            </div>
          ) :
          <div className="flex items-center justify-center mt-10">
            <Button
              className="mt-5 w-full  md:w-[30vw]"
              onClick={() => setShowPopup(true)}
            >
              Contactar Desrollador
            </Button>
          </div>
      }



      {showPopup &&
        <PopupWithInput
          closePopup={() => setShowPopup(false)}
          saveMessage={() => setShowSimplePopUp(true)}
          title="Contactar Desarrollador"
          subtitle="¿Deseas contactar con este desarrollador?"
          placeholder="Escribe tu mensaje si quieres"
          closeButtonText="Cancelar"
          saveButtonText="Contactar"
        />
      }
      {
        showSimplePopUp &&
        <SimplePopUp
          closePopup={() => setShowSimplePopUp(false)}
          title="��Has contactado con el desarrollador!"
          subtitle="Pronto recibirás una respuesta"
          closeButtonText="Volver al Perfil"
        />
      }

      <ContactsModal
        open={openContacts}
        onCancel={() => setOpenContacts(false)}
        email={developer?.email}
        discord_link={developer?.discord_link}
        github_link={developer?.github_link}
        linkedin_link={developer?.linkedin_link}
      />

      <Modal
        open={openConfirm}
        message="Estas seguro que deseas confirmar este desarrollador?"
        onOpenChange={() => handleConfirmDeveloper()}
      />

    </div>
  );
};

export default PublicProfile;