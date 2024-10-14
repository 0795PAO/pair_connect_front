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
import { useSendInvitation } from "@/hooks/useSendInvitation";

const PublicProfile = () => {
  const { id, sessionId } = useParams();
  const {
    data: developerData,
    isLoading: isDeveloperLoading,
    isError: isDeveloperError,
  } = useDeveloperProfile(id, sessionId);
  const confirmParticipant = useConfirmParticipant();
  const sendInvitation = useSendInvitation();

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
  console.log(hasPermission);

  const handleConfirmDeveloper = () => {
    confirmParticipant.mutate({ sessionId, username: developer?.username });
    toggleModal("openConfirm", true);
    toggleModal("openConfirm", false);
  };



  const saveMessage = () => sendInvitation.mutate({ sessionId, id});

  // const isConfirmedParticipant = isConfirmed.mutate({ sessionId, })

  return (
    <div className="px-8">
      <GoBackButton text="Volver a la sesión"/>
      <h1 className="mb-10 text-4xl md:text-6xl text-primaryText justify-self-start">
        Perfil de{" "}
        <span className="font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
          {developer?.username}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10 items-stretch">
        <section className="flex flex-col items-center justify-between p-10 overflow-y-auto rounded-lg bg-card">
          <div className="flex flex-col items-center">
            <img
              src={developer?.photo}
              alt="Profile"
              className="object-cover w-40 h-40 mt-4 mb-8 rounded-full shadow-lg"
            />
            <p className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text">
              {developer?.name}
            </p>
            <p className="mt-4 text-xl font-medium text-textPrimary">
              {developer?.stack && developer.stack.length > 0
                ? `Desarrollador/a ${developer.stack_name}`
                : `Desarrollador/a Fullstack`}
            </p>
          </div>

          {hasPermission ? (
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
            </div>
          ) : (
            <div className="flex items-center justify-center mt-10">
              <Button
                className="mt-5"
                onClick={() => toggleModal("showPopup", true)}
              >
                Contactar
              </Button>
            </div>
          )}
        </section>

        <div className="flex flex-col justify-between gap-8">
          <SectionCard
            title="Sobre la persona desarrolladora"
            content={
              developer?.about_me ||
              "¡Todavía no se ha escrito una historia, pero seguro que está creando algo genial! 🎉🚀"
            }
          />

          <SectionCard
            title="Lenguajes y Frameworks"
            content={
              developer?.language_names?.length > 0 && (
                <ItemList items={developer?.language_names} />
              )
            }
          />
          <div className="grid items-center w-full grid-cols-2 gap-4">
            <SectionCard
              title="Stack"
              content={developer.stack_name || "Fullstack"}
            />
            <SectionCard
              title="Nivel"
              content={developer.level_name || "Junior"}
            />
          </div>
        </div>
      </div>

      {modalState.showPopup && (
        <PopupWithInput
          closePopup={() => toggleModal("showPopup", false)}
          saveMessage={saveMessage}
          title="Contactar Desarrollador/a"
          subtitle="¿Deseas contactar con este desarrollador/a?"
          placeholder="Escribe tu mensaje si quieres"
          closeButtonText="Cancelar"
          saveButtonText="Contactar"
        />
      )}
      {modalState.showSimplePopUp && (
        <SimplePopUp
          closePopup={() => toggleModal("showSimplePopUp", false)}
          title="��Has contactado con el desarrollador/a!"
          subtitle="Pronto recibirás una respuesta"
          closeButtonText="Volver al Perfil"
        />
      )}

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
        message="Estás seguro que deseas confirmar este desarrollador/a?"
        onOpenChange={() => toggleModal("openConfirm", false)}
        onClick={() => handleConfirmDeveloper()}
      />
    </div>
  );
};

export default PublicProfile
