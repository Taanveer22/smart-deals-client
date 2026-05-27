const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <span class="$$loading $$loading-bars $$loading-xs"></span>
        <span class="$$loading $$loading-bars $$loading-sm"></span>
        <span class="$$loading $$loading-bars $$loading-md"></span>
        <span class="$$loading $$loading-bars $$loading-lg"></span>
        <span class="$$loading $$loading-bars $$loading-xl"></span>
      </div>
    </div>
  );
};

export default Spinner;
