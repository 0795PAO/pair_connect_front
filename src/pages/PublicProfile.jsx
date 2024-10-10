import ContactsModal from "@/components/profile/ContacsModal";
import ItemList from "@/components/shared/ItemList";
import Loader from "@/components/shared/Loader";
import Modal from "@/components/shared/Modal";
import PopupWithInput from "@/components/shared/PopupWithInput";
import SimplePopUp from "@/components/shared/SimplePopUp";
import SectionCard from "@/components/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { useConfirmParticipant } from "@/hooks/useConfirmParticipant";
import { useDeveloperProfile } from "@/hooks/useDeveloperProfile";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "@/components/shared/GoBackButton";

const PublicProfile = () => {
  const { id, sessionId } = useParams();
  const { data: developerData, isLoading: isDeveloperLoading, isError: isDeveloperError } = useDeveloperProfile(id, sessionId);
  const confirmParticipant = useConfirmParticipant();


  const [modalState, setModalState] = useState({
    showPopup: false,
    showSimplePopUp: false,
    openContacts: false,
    openConfirm: false,
  });

  const toggleModal = (modalName, state) => {
    console.log(modalName);
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: state,
    }));

    console.log(modalState);
  };

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
    toggleModal("openConfirm", false);
  }

  // const isConfirmedParticipant = isConfirmed.mutate({ sessionId, })


  return (
    <div className="px-8">
      <GoBackButton text="Volver à la sesión" sessionId={sessionId} />
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
              {developer?.stack && developer.stack.length > 0 ? `Desarrollador ${developer.stack_name}` : `Desarrollador Fullstack`}
            </p>
          </div>

          {
            hasPermission ?
              (
                <div className="flex flex-col gap-4 mt-5">
                  <Button
                    variant="outline"
                    className=""
                    onClick={() => toggleModal("openContacts", true)}
                  >
                    Ver contactos
                  </Button>

                  <Button
                    className=""
                    onClick={() => toggleModal("openConfirm", true)}
                  >
                    Confirmar participación
                  </Button>

                  {/* <p>Has confirmado este desarrollador</p> */}
                </div>
              ) :
              <div className="flex items-center justify-center mt-10">
                <Button
                  className="mt-5"
                  onClick={() => toggleModal("showPopup", true)}
                >
                  Contactar Desrollador
                </Button>
              </div>
          }
        </section>

        <div className="flex flex-col justify-between gap-8">
          <SectionCard title="Sobre el desarrollador" content={developer?.about_me || "¡Este desarrollador aún no ha escrito su historia, pero seguro que está creando algo genial! 🎉🚀"} />

          <SectionCard title="Idiomas" content={developer?.language_names?.length > 0 && <ItemList items={developer?.language_names} />} />
          <div className="grid grid-cols-2 items-center w-full gap-4">
            <SectionCard title="Stack" content={developer.stack_name || "Fullstack"} />
            <SectionCard title="Nivel" content={developer.level_name || "Junior"} />
          </div>
        </div>
      </div>

      {modalState.showPopup &&
        <PopupWithInput
          closePopup={() => toggleModal("showPopup", false)}
          saveMessage={() => toggleModal("showPopup", false)}
          title="Contactar Desarrollador"
          subtitle="¿Deseas contactar con este desarrollador?"
          placeholder="Escribe tu mensaje si quieres"
          closeButtonText="Cancelar"
          saveButtonText="Contactar"
        />
      }
      {
        modalState.showSimplePopUp &&
        <SimplePopUp
          closePopup={() => toggleModal("showSimplePopUp", false)}
          title="��Has contactado con el desarrollador!"
          subtitle="Pronto recibirás una respuesta"
          closeButtonText="Volver al Perfil"
        />
      }

      <ContactsModal
        open={modalState.openContacts}
        onCancel={() => toggleModal("openContacts", false)}
        email={developer?.email}
        discord_link={developer?.discord_link}
        github_link={developer?.github_link}
        linkedin_link={developer?.linkedin_link}
      />

      <Modal
        open={modalState.openConfirm}
        onCancel={() => toggleModal("openConfirm", false)}
        message="Estas seguro que deseas confirmar este desarrollador?"
        onOpenChange={() => toggleModal("openConfirm", false)}
        onClick={() => handleConfirmDeveloper()}

      />

    </div>
  );
};

export default PublicProfile;