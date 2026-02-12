package cli

import (
	"fmt"
	"strconv"

	"monitoring-service/app/models"
	"monitoring-service/app/repositories"

	"github.com/spf13/cobra"
)

var repo = repositories.Init(repositories.Options{}).Parking

var rootCmd = &cobra.Command{
	Use:   "parking",
	Short: "Parking lot CLI",
	Long:  "CLI untuk mengelola parkiran (sesuai Pre Testing-Parkee)",
}

func init() {
	// create_parking_lot
	rootCmd.AddCommand(&cobra.Command{
		Use:  "create_parking_lot [capacity]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			capacity, _ := strconv.Atoi(args[0])
			lot, err := repo.CreateLot(cmd.Context(), capacity)
			if err != nil {
				fmt.Println("Error:", err.Error())
				return
			}
			fmt.Printf("Created a parking lot with %d slots\n", lot.Capacity)
		},
	})

	// park
	rootCmd.AddCommand(&cobra.Command{
		Use:  "park [car_number] [color]",
		Args: cobra.ExactArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			car := models.Car{CarNumber: args[0], Color: args[1]}
			slot, err := repo.Park(cmd.Context(), car)
			if err != nil {
				fmt.Println("Error:", err.Error())
				return
			}
			fmt.Printf("Allocated slot number: %d\n", slot)
		},
	})

	// leave
	rootCmd.AddCommand(&cobra.Command{
		Use:  "leave [car_number] [hours]",
		Args: cobra.ExactArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			hours, _ := strconv.Atoi(args[1])
			slot, charge, err := repo.Leave(cmd.Context(), args[0], hours)
			if err != nil {
				fmt.Println(err.Error()) // tampilkan pesan error sesuai repository
				return
			}
			fmt.Printf("Registration number %s with Slot Number %d is free with Charge %d\n",
				args[0], slot, charge)
		},
	})

	// status
	rootCmd.AddCommand(&cobra.Command{
		Use:  "status",
		Args: cobra.NoArgs,
		Run: func(cmd *cobra.Command, args []string) {
			slots, err := repo.Status(cmd.Context())
			if err != nil {
				fmt.Println("Error:", err.Error())
				return
			}
			fmt.Println("Slot No.\tRegistration No.\tColour")
			for _, s := range slots {
				if s.IsOccupied {
					fmt.Printf("%d\t\t%s\t\t%s\n", s.SlotNumber, s.Car.CarNumber, s.Car.Color)
				}
			}
		},
	})
}

func Execute() error {
	return rootCmd.Execute()
}
